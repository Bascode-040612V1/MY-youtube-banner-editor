# YouTube Banner Editor

A web-based tool for creating and customizing YouTube banners with real-time preview and export capabilities.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![html2canvas](https://img.shields.io/badge/html2canvas-FFA500?style=for-the-badge&logo=html5&logoColor=white)

## Features

- **Multiple Layouts**: Desktop, Tablet, Mobile, and Cutline views
- **Banner Selection**: Choose from multiple background images
- **Customizable Text**: Change colors and formatting for titles and icon names
- **Title Format**: Toggle between single-line and two-line title display
- **Real-time Preview**: See changes instantly as you make them
- **Export Options**: Save banners in standard or Ultra HD quality

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Python 3 (for local server, optional)

### Running the Application

#### Method 1: Using Python (Recommended)
1. Open a terminal/command prompt
2. Navigate to the project folder:
   ```
   cd path/to/youtube_banner_web
   ```
3. Start a local server:
   ```
   python -m http.server 8000
   ```
4. Open your browser and go to `http://localhost:8000`

#### Method 2: Direct File Opening
1. Open `index.html` directly in your web browser
2. Note: Some features may not work properly due to browser security restrictions

## How to Use

1. **Select a Banner**: Choose a background image from the dropdown
2. **Change Layout**: Click "Layout" button to cycle through Desktop, Tablet, Mobile, and Cutline views
3. **Customize Colors**: 
   - Use "Title Color" dropdown to change title color
   - Use "Icon Name Color" dropdown to change social icon name colors
4. **Title Format**: Toggle between single-line and two-line title display
5. **Preview**: See your changes in real-time
6. **Save**: 
   - Click "Save Banner" for standard quality
   - Click "Save Ultra HD (2560×1440)" for maximum quality YouTube banner

## Export Options

- **Standard Save**: Good quality at smaller file sizes
- **Ultra HD Save**: Maximum quality at full 2560×1440 resolution (YouTube recommended size)

## Customization

### Adding New Banners
1. Add your image files to the project folder
2. Edit `index.html` to add new options to the banner selection dropdown
3. Add corresponding CSS rules in `styles.css` for the new banner classes

### Modifying Styles
- `styles.css`: Contains all styling rules
- `index.html`: Contains the UI structure
- `script.js`: Contains all interactive functionality

## Troubleshooting

### Buttons Not Working
- Make sure you're running the application through a web server (not directly opening the HTML file)
- Check browser console for error messages (F12 Developer Tools)

### Save Function Not Working
- Ensure you have permission to download files in your browser
- Try using a different browser if issues persist

## Built With

- HTML5
- CSS3
- JavaScript
- [html2canvas](https://html2canvas.hertzen.com/) - For image capture

## Author

Joshua Pavia Basco

## License

This project is free to use and modify.