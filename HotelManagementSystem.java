// MODULE 4: Main Application and User Menu
import java.util.Scanner;

public class HotelManagementSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HotelService hotelService = new HotelService();

        while (true) {
            System.out.println("\n=================================");
            System.out.println("     HOTEL MANAGEMENT SYSTEM     ");
            System.out.println("=================================");
            System.out.println("1. View Available Rooms");
            System.out.println("2. Book a Room");
            System.out.println("3. Check-Out & Generate Bill");
            System.out.println("4. View Active Bookings");
            System.out.println("5. Exit");
            System.out.print("Enter choice (1-5): ");
            System.out.flush();

            int choice = sc.nextInt();
            switch (choice) {
                case 1:
                    hotelService.displayAvailableRooms();
                    break;
                case 2:
                    hotelService.bookRoom(sc);
                    break;
                case 3:
                    hotelService.checkOut(sc);
                    break;
                case 4:
                    hotelService.viewAllBookings();
                    break;
                case 5:
                    System.out.println("Exiting system. Good luck with your project!");
                    sc.close();
                    System.exit(0);
                default:
                    System.out.println("Invalid selection. Try again.");
            }
        }
    }
}
