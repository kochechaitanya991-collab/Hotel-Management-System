public class Room {
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
