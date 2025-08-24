document.addEventListener("DOMContentLoaded", () => {
    const reasonInput = document.getElementById("reason");
    const submitBtn = document.getElementById("cancel_button");
    let formSubmitted = false;

    // Disable button by default
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "#ccc";
    submitBtn.style.cursor = "not-allowed";

    // Function to toggle button state
    function toggleButtonState() {
        // If form already submitted, never re-enable button
        if (formSubmitted) return;

        const captchaResponse = grecaptcha.getResponse();
        if (reasonInput.value.trim() !== "" && captchaResponse.length > 0) {
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = "#0078d7";
            submitBtn.style.cursor = "pointer";
        } else {
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = "#ccc";
            submitBtn.style.cursor = "not-allowed";
        }
    }

    // Listen for typing in the reason box
    reasonInput.addEventListener("input", toggleButtonState);

    // reCAPTCHA callback
    window.recaptchaCompleted = toggleButtonState;

    // Button click handler
    window.myButtonClicked = function(event) {
        event.preventDefault();

        const reason = reasonInput.value.trim();
        const captchaResponse = grecaptcha.getResponse();
        const errorMsg = document.getElementById("errorMsg");

        // Validate inputs before showing video
        if (reason === "") {
            errorMsg.textContent = "Please provide a reason.";
            return;
        }
        if (captchaResponse.length === 0) {
            errorMsg.textContent = "Please complete the reCAPTCHA.";
            return;
        }

        errorMsg.textContent = "";

        // If iframe already exists, do nothing
        let container = document.getElementById("video-container");
        if (container) return;

        // Mark form as submitted so button won't re-enable
        formSubmitted = true;

        // Disable button permanently
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = "#ccc";
        submitBtn.style.cursor = "not-allowed";

        // Create video container
        container = document.createElement("div");
        container.id = "video-container";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.marginTop = "20px";

        const msg = document.createElement("h1");
        msg.textContent = "Important Message From Roger";
        msg.style.textAlign = "center";
        msg.style.marginBottom = "16px";

        const iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube.com/embed/EajX1kxOmmU?autoplay=1";
        iframe.width = "600";
        iframe.height = "400";
        iframe.style.border = "none";
        iframe.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.25)";
        iframe.style.borderRadius = "8px";
        iframe.setAttribute("allow", "autoplay");

        container.appendChild(msg);
        container.appendChild(iframe);
        document.body.appendChild(container);
    };
});