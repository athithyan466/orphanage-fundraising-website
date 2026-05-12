import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const images = [
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200",
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200",
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
    "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1200",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(slider);
  }, []);
  const loadRazorpay = () => {
    return new Promise((resolve) => {

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const handlePayment = async () => {

    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const response = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 500,
      }),
    });

    const data = await response.json();

    const options = {

      key: "rzp_test_SnshYwMPoVw70N",

      amount: data.amount,

      currency: data.currency,

      name: "Hope Foundation",

      description: "Donation",

      order_id: data.id,

      handler: function (response) {

        alert("Payment Successful");

        console.log(response);

      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };
  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <h1 className="logo">Hope Foundation</h1>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#achievements">Achievements</a>
          <a href="#gallery">Gallery</a>
          <a href="#location">Location</a>
          <a href="#donate">Donate</a>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}

      <section className="hero" id="home">

        <div className="overlay"></div>

        <img
          src={images[current]}
          alt="Children"
          className="hero-image"
        />

        <div className="hero-content">
          <h2>Give Every Child A Better Tomorrow</h2>

          <p>
            Your support can provide education, food, shelter,
            healthcare and happiness for orphan children.
          </p>

          <a href="#donate">
            <button className="donate-btn">Donate Now</button>
          </a>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}

      <section className="about" id="about">

        <h2>About Us</h2>

        <p>
          Hope Foundation is a child orphanage and care center dedicated
          to helping underprivileged children build a safe and successful future.
          We provide quality education, healthy food, medical support,
          emotional care and a loving environment for every child.
        </p>

        <div className="about-cards">

          <div className="card">
            <h3>Education</h3>
            <p>
              Providing school education, books and digital learning support.
            </p>
          </div>

          <div className="card">
            <h3>Healthcare</h3>
            <p>
              Regular health checkups, medicines and nutrition programs.
            </p>
          </div>

          <div className="card">
            <h3>Safe Shelter</h3>
            <p>
              Giving children a secure and caring place to live happily.
            </p>
          </div>

        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}

      <section className="achievements" id="achievements">

        <h2>Our Achievements</h2>

        <div className="achievement-box">

          <div className="achievement-card">
            <h1>500+</h1>
            <p>Children Supported</p>
          </div>

          <div className="achievement-card">
            <h1>120+</h1>
            <p>Volunteers</p>
          </div>

          <div className="achievement-card">
            <h1>15+</h1>
            <p>Years of Service</p>
          </div>

          <div className="achievement-card">
            <h1>300+</h1>
            <p>Successful Donations</p>
          </div>

        </div>
      </section>

      {/* ================= GALLERY ================= */}

      <section className="gallery" id="gallery">

        <h2>Children Gallery</h2>

        <div className="gallery-grid">

          {images.map((img, index) => (
            <img key={index} src={img} alt="gallery" />
          ))}

        </div>
      </section>

      {/* ================= LOCATION ================= */}

      <section className="location" id="location">

        <h2>Our Location</h2>

        <p>
          Hope Foundation, Tamil Nadu, India
        </p>


      </section>

      {/* ================= DONATE SECTION ================= */}

      <section className="donate-section" id="donate">

        <h2>Support Our Children</h2>

        <p>
          Every donation creates hope and a brighter future for children.
        </p>

        <div className="donate-box">

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=DonateToHopeFoundation"
            alt="QR Code"
          />

          <div className="donate-details">
            <h3>Scan & Pay</h3>

            <p><strong>PhonePe / GPay:</strong> +91 9876543210</p>

            <p><strong>UPI ID:</strong> hopefoundation@upi</p>

            <button className="donate-btn" onClick={handlePayment}>

              Donate Today
            </button>
          </div>

        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <h3>Hope Foundation</h3>

        <p>
          Together we can give every child love, care and opportunities.
        </p>

        <p>© 2026 Hope Foundation. All Rights Reserved.</p>

      </footer>

    </div>
  );
}

export default App;