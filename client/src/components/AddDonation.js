import { useState } from "react";
import API from "../services/api";

function AddDonation() {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");
  const [locationImage, setLocationImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("quantity", quantity);
    formData.append("expiryDate", expiryDate);
    formData.append("location", location);
    formData.append("locationImage", locationImage);

    try {
      await API.post(
        "/donations/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Donation added successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding donation");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Food Name"
        onChange={(e) => setFoodName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        type="date"
        onChange={(e) => setExpiryDate(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setLocationImage(e.target.files[0])}
      />

      <button type="submit">Donate Food</button>
    </form>
  );
}

export default AddDonation;
