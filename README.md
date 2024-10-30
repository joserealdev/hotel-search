# Hotel Booking App

## Overview

This app provides a user-friendly interface for searching and booking hotels. It includes the following key features:

- Filters: Users can apply filters to refine their hotel search based on various criteria.
- Hotel Listing: The app displays an infinite scrolling list of hotel cards, allowing users to browse and select hotels.
- Map Integration: The app integrates a map component to display the location of the filtered hotels.

## Layout

The app's layout is designed with a responsive approach, adjusting to different screen sizes:

### Desktop

- Left column: Filters
- Center column: Hotel listing with sorting
- Right column: Map

### Mobile/Tablet

- Filters and sorting controls are collapsed and accessible through toggles
- Hotel listing and map are stacked vertically

## Filters

Users can apply the following filters to refine their hotel search:

- Star rating
- Amenities (e.g., free breakfast, pool, gym)

## Hotel Listing

The hotel listing is implemented using an infinite scrolling approach, where the app loads more hotel cards as the user scrolls down. Each hotel card displays the following information:

- Hotel name
- Price per night
- Star rating
- Featured image

## Map Integration

The app integrates a map component to display the location of the filtered hotels. Each hotel is represented by a marker on the map, and users can click on the markers to view more information about the hotel.

## Technologies Used

- Nextjs 14
- Leaflet.js (for map integration)
- Tailwind CSS (for styling)

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/hotel-booking-app.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open the app in your browser: `http://localhost:3000`

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -am 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request
