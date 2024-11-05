
# Quick Salon System

A web application designed to streamline the salon appointment process, enabling users to book appointments at the nearest or any available salon. Inspired by ride-hailing apps like Ola and Uber, this system prioritizes efficiency in appointment scheduling, reduces wait times, and securely handles payments.

## Features

1. **Nearest Salon Booking**: Users can find and book appointments at the closest available salon, similar to apps like Ola or Uber.
2. **Any Salon Booking**: Flexibility to book appointments at any available salon.
3. **Real-time Availability**: Shows updated slot availability, ensuring accurate booking and scheduling.
4. **Optimized Scheduling**: Manages appointments to minimize wait times and maximize salon resources.
5. **Secure Payment Handling**: Integrates payment gateway for seamless and safe transactions.

## Challenges Addressed

1. **Reduced Waiting Time**: Designed to get customers to a salon chair with minimal delay.
2. **Efficient Appointment Scheduling**: Implements an optimized scheduling algorithm for better service flow.
3. **Payment Processing**: Securely manages payments for a smooth user experience.

## Technologies Used

- **Frontend**: React.js (UI development) with Chakra UI components
- **Backend**: Java Spring Boot for managing API and business logic
- **Database**: MySQL for storing user, salon, and appointment data
- **Real-time Scheduling**: Dynamic slot management for availability tracking

## Getting Started

These instructions will help you set up the project on your local machine for development and testing.

### Prerequisites

- **Node.js** and **npm** (for frontend setup)
- **Java JDK** (for backend setup with Spring Boot)
- **MySQL** 

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/Salon-Appointment-Booking-System.git
   cd Salon-Appointment-Booking-System
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup**
   - Go to the backend folder:
     ```bash
     cd ../backend
     ```
   - Configure the database connection in `application.properties`.
   - Build and run the backend:
     ```bash
     ./mvnw spring-boot:run
     ```

4. **Database Setup** (if applicable)
   - Create and set up the database according to the project requirements.
   - Update your backend configuration to match your database credentials.

### Running the Application

1. **Run the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Access the App**
   - Open your browser and navigate to `http://localhost:5173` to use the application.

## Usage

1. **Book Appointment**: Choose between the nearest salon or any other available salon.
2. **Manage Bookings**: Track and update appointment details.
3. **Make Payments**: Securely handle payments through the integrated payment gateway.

## Contributing

We welcome contributions! Feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, feel free to reach out:

- **Email**: [mahadevwaghmode2@gmail.com](mailto:mahadevwaghmode2@gmail.com)
- **GitHub**: [https://github.com/mahadevwaghmode](https://github.com/mahadevwaghmode)
