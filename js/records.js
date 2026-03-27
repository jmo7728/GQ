const searchBtn = document.getElementById("searchBtn");
const emailInput = document.getElementById("emailSearch");
const resultBox = document.getElementById("result");

const API_URL = "https://script.google.com/macros/s/AKfycbzkDEB1FKL83NWZScOjLGuiTn-esTZuGu6ykzWUjIDok7z38PuQ4orwXhtNuepZnlnwEw/exec";

searchBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();

  if (!email) {
    resultBox.style.display = "block";
    resultBox.innerHTML = `<p>Please enter your email.</p>`;
    return;
  }

  resultBox.style.display = "block";
  resultBox.innerHTML = `<p>Loading record...</p>`;

  try {
    const response = await fetch(
      `${API_URL}?email=${encodeURIComponent(email)}`
    );

    const data = await response.json();

    if (!data.success) {
      resultBox.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    const record = data.record;
    const percentage = record.percentage;
    const statusClass = record.status.toLowerCase() === "member"
      ? "status-member"
      : "status-nonmember";

    resultBox.innerHTML = `
      <div class="record-grid">
        <div class="record-item">
          <span class="record-title">First Name</span>
          <span class="record-value">${record.firstName}</span>
        </div>

        <div class="record-item">
          <span class="record-title">Last Name</span>
          <span class="record-value">${record.lastName}</span>
        </div>

        <div class="record-item">
          <span class="record-title">Email</span>
          <span class="record-value">${record.email}</span>
        </div>

        <div class="record-item">
          <span class="record-title">Membership Status</span>
          <span class="record-value ${statusClass}">${record.status}</span>
        </div>
      </div>

      <div class="attendance-section">
        <h2>Attendance Breakdown</h2>

        <div class="attendance-grid">
          <div class="attendance-box">
            <span class="record-title">Meetings</span>
            <span class="record-value">${record.meetings} / 6</span>
          </div>

          <div class="attendance-box">
            <span class="record-title">Political Action</span>
            <span class="record-value">${record.politicalAction}</span>
          </div>

          <div class="attendance-box">
            <span class="record-title">Community Service</span>
            <span class="record-value">${record.communityService} / 1</span>
          </div>

          <div class="attendance-box">
            <span class="record-title">Title 9</span>
            <span class="record-value">${record.title9 === 1 ? "Completed" : "Not Completed"}</span>
          </div>
        </div>
      </div>

      <div class="progress-section">
        <h2>Membership Progress</h2>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percentage}%;">
            <span class="progress-text">${percentage}%</span>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    resultBox.innerHTML = `<p>There was an error pulling your record.</p>`;
  }
});