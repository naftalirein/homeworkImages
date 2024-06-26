#!/bin/bash

# Save the current directory
original_dir=$(pwd)

# Change to the aiServer directory and install requirements
echo "Setting up AI Server..."
cd aiServer || { echo "Failed to change to aiServer directory"; exit 1; }
pip install -r requirements.txt || { echo "Failed to install AI server requirements"; exit 1; }

# Start the Python script
echo "Starting AI Server..."
python app/main.py &

# Wait for 10 seconds
echo "Waiting for 10 seconds..."
sleep 10

# Change to the server directory and set it up
echo "Setting up Node.js server..."
cd ../server || { echo "Failed to change to server directory"; exit 1; }
npm install || { echo "Failed to install server dependencies"; exit 1; }

# Start the server
echo "Starting Node.js server..."
npm start &

# Change to the file_uploader directory and set it up
echo "Setting up file uploader..."
cd ../file_uploader || { echo "Failed to change to file_uploader directory"; exit 1; }
npm install || { echo "Failed to install file uploader dependencies"; exit 1; }

# Start the file uploader
echo "Starting file uploader..."
npm start &

# Return to the original directory
cd "$original_dir" || { echo "Failed to return to original directory"; exit 1; }

echo "All services started. Press Ctrl+C to stop."

# Wait for user input to keep the script running and services active
read -p "Press Enter to exit..."