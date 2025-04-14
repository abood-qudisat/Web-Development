class User {
    constructor(email, name, phone, gender, address) {
      this.email = email;
      this.name = name;
      this.phone = phone;
      this.gender = gender;
      this.address = address;
    }
  }
  
  
  const users = [];
  
  
  const addUserTab = document.getElementById("addUserTab");
  const previewUsersTab = document.getElementById("previewUsersTab");
  const addUserSection = document.getElementById("addUserSection");
  const previewUsersSection = document.getElementById("previewUsersSection");
  
  const userForm = document.getElementById("userForm");
  const successMessage = document.getElementById("successMessage");
  
  const tableViewBtn = document.getElementById("tableViewBtn");
  const cardViewBtn = document.getElementById("cardViewBtn");
  const usersDisplay = document.getElementById("usersDisplay");
  
  
  addUserTab.onclick = () => {
    addUserTab.classList.add("active");
    previewUsersTab.classList.remove("active");
    addUserSection.classList.add("active");
    previewUsersSection.classList.remove("active");
  };
  
  previewUsersTab.onclick = () => {
    previewUsersTab.classList.add("active");
    addUserTab.classList.remove("active");
    previewUsersSection.classList.add("active");
    addUserSection.classList.remove("active");
    renderUsers(); 
  };
  
  
  userForm.onsubmit = (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value.trim();
  
    if (!validateEmail(email) || !/^[A-Za-z\s]+$/.test(name) || !/^\d{10,}$/.test(phone) || !gender || !address) {
      alert("Please fill out the form correctly.");
      return;
    }
  
    const user = new User(email, name, phone, gender, address);
    users.push(user);
  
    successMessage.textContent = "User added successfully!";
    setTimeout(() => (successMessage.textContent = ""), 3000);
    userForm.reset();
  };
  
  
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
 
  tableViewBtn.onclick = () => {
    tableViewBtn.classList.add("active");
    cardViewBtn.classList.remove("active");
    renderUsers("table");
  };
  
  cardViewBtn.onclick = () => {
    cardViewBtn.classList.add("active");
    tableViewBtn.classList.remove("active");
    renderUsers("card");
  };
  
  
  function renderUsers(view = "table") {
    usersDisplay.innerHTML = "";
  
    if (users.length === 0) {
      usersDisplay.innerHTML = "<p>No users added yet.</p>";
      return;
    }
  
    if (view === "card") {
      users.forEach((user) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Gender:</strong> ${user.gender}</p>
          <p><strong>Address:</strong> ${user.address}</p>
        `;
        usersDisplay.appendChild(div);
      });
    } else {
      const table = document.createElement("table");
      table.id='table1';
      const header = `
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Address</th>
        </tr>
      `;
      table.innerHTML = header;
  
      users.forEach((user) => {
        const row = `
          <tr>
            <td>${user.email}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.gender}</td>
            <td>${user.address}</td>
          </tr>
        `;
        table.innerHTML += row;
      });
  
      usersDisplay.appendChild(table);
    }
  }
  
  