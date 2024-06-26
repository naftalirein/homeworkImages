# main.py
from flask import Flask, request, jsonify
from image_processor import image_processor

app = Flask(__name__)
processor = image_processor()

@app.route('/process_image', methods=['POST'])
def process_image():
    # Check if the request has JSON data
    if request.is_json:
        data = request.json
        image_path = data.get('image_path')
    else:
        # If not JSON, check form data
        image_path = request.form.get('image_path')

    if not image_path:
        return jsonify({'error': 'No image_path provided'}), 400

    try:
        result = processor(image_path)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': f'Error processing: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=3020)