// MODULE 2: Customer Management
public class Customer {
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
