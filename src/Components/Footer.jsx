
function Footer() {
    return (
        <div id="footer" className="">
            <div className="foot">
                <h3>Contacts</h3>
                <div className="contacts">
                    <a href="######" className="contact-item">
                        <i className="bi bi-house"></i>
                        123/Colombo/Sri Lanka
                    </a>
                    <a href="tel:+94123456789" className="contact-item">
                        <i className="bi bi-telephone"></i>
                        +94 12 345 6789
                    </a>
                    <a href="mailto:contact@gmail.com" className="contact-item">
                        <i className="bi bi-envelope"></i>
                        contact@gmail.com
                    </a>
                </div>
            </div>

            <div className="foot">
                <h3>Get Help</h3>
                <a href="####" className="help-item">FAQ</a>
                <a href="####" className="help-item">Shipping</a>
                <a href="####" className="help-item">Returns</a>
                <a href="####" className="help-item">Payment Options</a>
            </div>

            <div className="foot">
                <h3>Our Stores</h3>
                <a href="#####" className="store-item">Sri Lanka</a>
                <a href="###" className="store-item">USA</a>
                <a href="####" className="store-item">India</a>
                <a href="###" className="store-item">Japan</a>
            </div>

            <div className="foot">
                <h3>Follow Us</h3>
                <div className="social">
                    <a href="https://facebook.com" className="social-icon"><i className="bi bi-facebook"></i></a>
                    <a href="https://twitter.com" className="social-icon"><i className="bi bi-twitter"></i></a>
                    <a href="https://instagram.com" className="social-icon"><i className="bi bi-instagram"></i></a>
                    <a href="https://linkedin.com" className="social-icon"><i className="bi bi-linkedin"></i></a>
                </div>
            </div>

            {/* <div className="foot">
                <h3>Newsletter</h3>
                <div className="newsletter">
                    <input type="text" placeholder="Enter your email id here" className="email-input" />
                    <button className="subscribe-button">Subscribe</button>
                </div>
            </div> */}
        </div>
    );
}

export default Footer;
