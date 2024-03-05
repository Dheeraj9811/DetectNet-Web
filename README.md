# DetectNet-Web

DetectNet-web is your ultimate tool for effortless object detection, powered by ReactJS. This sleek web app is designed to run smoothly on edge devices, providing real-time detection without the need for extensive infrastructure. With its integrated ML object model, DetectNet-web delivers accurate detection results with lightning speed. Step into the future of object detection technology with DetectNet-web.

## Features

- Real-time object detection using webcam feed
- Uses TensorFlow.js and COCO-SSD model
- Detects multiple objects at once
- Draws bounding boxes around detected objects

## Getting Started

To get started with DetectNet-Web, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/DetectNet-Web.git
    
    cd DetectNet-Web
    npm install
    npm run dev
    ```
Open your web browser and navigate to http://localhost:3000 to use the application.


# TODO
- Fix the bounding box for smaller screen sizes (below 640x480)

# Contributing
Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

# Usage
Upon launching the application, you will be prompted to select a webcam device.
Once a webcam is selected, the application will start detecting objects in real time from the webcam feed.
Detected objects will be highlighted with bounding boxes.
