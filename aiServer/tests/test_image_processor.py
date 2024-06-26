# test_image_processor.py
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import unittest
from unittest.mock import patch
from app.image_processor import image_processor

class TestImageProcessor(unittest.TestCase):
    def setUp(self):
        self.processor = image_processor()
    
    def test_call(self):
        image_path = 'path/to/image'
        result = self.processor(image_path)
        self.assertIn(result, [1, 2])

if __name__ == '__main__':
    unittest.main()