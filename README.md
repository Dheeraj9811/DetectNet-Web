# DetectNet-Web

DetectNet-Web is a simple object detection application that utilizes TensorFlow.js and the COCO-SSD model to detect objects in real time using your webcam. It can detect multiple objects simultaneously and draw bounding boxes around them.

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
