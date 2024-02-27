import React from 'react'

export const drawRect = (detections, ctx) => {
    detections.forEach(prediction => {
        // Extract boxes and classes
        const [x, y, width, height] = prediction['bbox'];
        const text = prediction['class'];

        // Set styling
        const color = 'red';
        ctx.strokeStyle = color;
        ctx.font = '18px Arial';
        ctx.fillStyle = color;

        // Draw rectangles and text
        ctx.beginPath();
        ctx.fillText(text, x, y);
        ctx.rect(x, y, width, height);
        ctx.stroke();
    });
}