// tests/processController.test.js
const fs = require('fs');
const { processFile } = require('../src/controllers/processController');

jest.mock('child_process');
jest.mock('fs');

describe('processFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if file path is missing', () => {
    const req = { query: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    processFile(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('File path is required.');
  });

  it('should return file paths', () => {
    const req = { query: { filePath: 'test/path' } };
    const res = {
      send: jest.fn(),
    };
    const pythonProcess = {
      stdout: {
        on: jest.fn().mockImplementation((event, callback) => {
          if (event === 'data') {
            callback('1');
          }
        }),
      },
      stderr: {
        on: jest.fn(),
      },
      on: jest.fn(),
    };
    jest.spyOn(fs, 'readdir').mockImplementation((path, callback) => {
      callback(null, ['file1.jpg', 'file2.jpg']);
    });

    jest.spyOn(require('child_process'), 'spawn').mockReturnValue(pythonProcess);

    processFile(req, res);

    expect(fs.readdir).toHaveBeenCalledWith(
      'public/images/1',
      expect.any(Function)
    );
    expect(res.send).toHaveBeenCalledWith('images/1/file1.jpg,images/1/file2.jpg');
  });

  it('should return an empty string if the folder does not exist', () => {
    const req = { query: { filePath: 'test/path' } };
    const res = {
      send: jest.fn(),
    };
    const pythonProcess = {
      stdout: {
        on: jest.fn().mockImplementation((event, callback) => {
          if (event === 'data') {
            callback('1');
          }
        }),
      },
      stderr: {
        on: jest.fn(),
      },
      on: jest.fn(),
    };
    const error = new Error('Folder does not exist');
    error.code = 'ENOENT';
    jest.spyOn(fs, 'readdir').mockImplementation((path, callback) => {
      callback(error);
    });

    jest.spyOn(require('child_process'), 'spawn').mockReturnValue(pythonProcess);

    processFile(req, res);

    expect(fs.readdir).toHaveBeenCalledWith(
      'public/images/1',
      expect.any(Function)
    );
    expect(res.send).toHaveBeenCalledWith('');
  });
});