import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// MODULE 1: Room Management
class Room {
    private final int roomNumber;
    private final String category;
    private final double pricePerNight;
    private boolean isBooked;

    public Room(int roomNumber, String category, double pricePerNight) {
        this.roomNumber = roomNumber;
        this.category = category;
        this.pricePerNight = pricePerNight;
        this.isBooked = false;
    }

    public int getRoomNumber() { return roomNumber; }
    public String getCategory() { return category; }
    public double getPricePerNight() { return pricePerNight; }
    public boolean isBooked() { return isBooked; }
    public void setBooked(boolean booked) { isBooked = booked; }

    @Override
    public String toString() {
        return String.format("Room %d | Type: %-10s | Price: ₹%.2f/night | Status: %s",
                roomNumber, category, pricePerNight, (isBooked ? "Occupied" : "Available"));
    }
}

// MODULE 2: Customer Management
class Customer {
    private String name;
    private String phone;
    private int roomNumber;
    private int daysStayed;

    public Customer(String name, String phone, int roomNumber, int daysStayed) {
        this.name = name;
        this.phone = phone;
        this.roomNumber = roomNumber;
        this.daysStayed = daysStayed;
    }

    public String getName() { return name; }
    public String getPhone() { return phone; }
    public int getRoomNumber() { return roomNumber; }
    public int getDaysStayed() { return daysStayed; }
}

// MODULE 3: Hotel Services and Booking Operations
class HotelService {
    private final List<Room> rooms = new ArrayList<>();
    private final List<Customer> customers = new ArrayList<>();

    public HotelService() {
        // Pre-populating default room inventory
        rooms.add(new Room(101, "Single", 1200.00));
        rooms.add(new Room(102, "Single", 1200.00));
        rooms.add(new Room(201, "Double", 2000.00));
        rooms.add(new Room(202, "Double", 2000.00));
        rooms.add(new Room(301, "Deluxe", 3500.00));
    }

    public void displayAvailableRooms() {
        System.out.println("\n--- Available Rooms ---");
        boolean found = false;
        for (Room r : rooms) {
            if (!r.isBooked()) {
                System.out.println(r);
                found = true;
            }
        }
        if (!found) {
            System.out.println("No rooms currently available.");
        }
    }

    public void bookRoom(Scanner sc) {
        displayAvailableRooms();
        System.out.print("\nEnter Room Number to Book: ");
        System.out.flush();
        int roomNum = sc.nextInt();
        sc.nextLine(); // consume newline

        Room selectedRoom = null;
        for (Room r : rooms) {
            if (r.getRoomNumber() == roomNum && !r.isBooked()) {
                selectedRoom = r;
                break;
            }
        }

        if (selectedRoom == null) {
            System.out.println("Invalid Room Number or Room is already occupied.");
            return;
        }

        System.out.print("Enter Customer Name: ");
        System.out.flush();
        String name = sc.nextLine();
        System.out.print("Enter Customer Phone: ");
        System.out.flush();
        String phone = sc.nextLine();
        System.out.print("Enter Number of Days for Stay: ");
        System.out.flush();
        int days = sc.nextInt();

        selectedRoom.setBooked(true);
        customers.add(new Customer(name, phone, roomNum, days));
        System.out.println("Booking successful! Room " + roomNum + " assigned to " + name + ".");
    }

    public void checkOut(Scanner sc) {
        System.out.print("\nEnter Room Number for Check-Out: ");
        System.out.flush();
        int roomNum = sc.nextInt();

        Customer targetCustomer = null;
        for (Customer c : customers) {
            if (c.getRoomNumber() == roomNum) {
                targetCustomer = c;
                break;
            }
        }

        if (targetCustomer == null) {
            System.out.println("No active booking found for Room " + roomNum);
            return;
        }

        Room targetRoom = null;
        for (Room r : rooms) {
            if (r.getRoomNumber() == roomNum) {
                targetRoom = r;
                break;
            }
        }

        if (targetRoom == null) {
            System.out.println("Room details could not be found for Room " + roomNum);
            return;
        }

        double totalBill = targetCustomer.getDaysStayed() * targetRoom.getPricePerNight();

        System.out.println("\n==================================");
        System.out.println("          CHECK-OUT BILL          ");
        System.out.println("==================================");
        System.out.println("Customer Name : " + targetCustomer.getName());
        System.out.println("Phone Number  : " + targetCustomer.getPhone());
        System.out.println("Room Number   : " + targetCustomer.getRoomNumber());
        System.out.println("Room Category : " + targetRoom.getCategory());
        System.out.println("Stay Duration : " + targetCustomer.getDaysStayed() + " days");
        System.out.println("Rate/Night    : ₹" + targetRoom.getPricePerNight());
        System.out.println("----------------------------------");
        System.out.println("Total Amount  : ₹" + totalBill);
        System.out.println("==================================");

        targetRoom.setBooked(false);
        customers.remove(targetCustomer);
        System.out.println("Check-out completed successfully.");
    }

    public void viewAllBookings() {
        System.out.println("\n--- Current Active Bookings ---");
        if (customers.isEmpty()) {
            System.out.println("No active bookings.");
            return;
        }
        for (Customer c : customers) {
            System.out.println("Room: " + c.getRoomNumber() + " | Guest: " + c.getName() + " | Phone: " + c.getPhone() + " | Duration: " + c.getDaysStayed() + " days");
        }
    }
}

// MODULE 4: Main Application and User Menu
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