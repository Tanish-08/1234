
const form = document.getElementById('examForm');
const feeReceiptFile = document.getElementById('feeReceiptFile');

function toggleFormSection() {
    const backPaperCheckbox = document.getElementById('backPaperCheckbox').checked;
    const repeatCourseCheckbox = document.getElementById('repeatCourseCheckbox').checked;
    const backPaperSection = document.getElementById('back-paper-section');
    const repeatCourseSection = document.getElementById('repeat-course-section');

    backPaperSection.classList.toggle('hidden', !backPaperCheckbox);
    repeatCourseSection.classList.toggle('hidden', !repeatCourseCheckbox);

    resetSectionInputs(backPaperSection, !backPaperCheckbox);
    resetSectionInputs(repeatCourseSection, !repeatCourseCheckbox);
}

function resetSectionInputs(section, hidden) {
    const inputs = section.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.value = hidden ? '' : input.value;
        input.setCustomValidity('');
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    const inputs = document.querySelectorAll('input[type="text"], input[type="date"], input[type="file"], input[type="email"], input[type="number"], select');
    inputs.forEach(input => {
        if (input.value.trim() === "" && input.required) {
            input.setCustomValidity("This field is required.");
            isValid = !isValid;
        } else {
            input.setCustomValidity("");
        }
        input.reportValidity();
    });

    if (isValid) {
        alert('You have successfully submitted the form!');
        form.reset();
        toggleFormSection(); // Reset form sections visibility
    }
});

function addRow(tableId) {
    const table = document.getElementById(tableId);
    const rowCount = table.rows.length;
    const row = table.insertRow(rowCount);
    row.innerHTML = `<td class="serial-no">${rowCount}</td>
                     <td>
                         <select name="${tableId === 'back-paper' ? 'back_semester[]' : 'repeat_semester[]'}" required>
                             <option value="">Select Semester</option>
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                             <option value="4">4</option>
                             <option value="5">5</option>
                             <option value="6">6</option>
                             <option value="7">7</option>
                             <option value="8">8</option>
                             <option value="9">9</option>
                             <option value="10">10</option>
                         </select>
                     </td>
                     <td><input type="text" name="${tableId === 'back-paper' ? 'back_course_code[]' : 'repeat_course_code[]'}" oninput="this.value = this.value.toUpperCase()" required></td>
                     <td><input type="text" name="${tableId === 'back-paper' ? 'back_course_name[]' : 'repeat_course_name[]'}" oninput="this.value = this.value.toUpperCase()" required></td>
                     <td><button type="button" class="add-remove-btn remove-btn" onclick="removeRow(this)">Remove</button></td>`;
}

function removeRow(button) {
    const row = button.parentNode.parentNode;
    const table = row.parentNode;
    table.deleteRow(row.rowIndex);
    updateSerialNumbers(table);
}

function updateSerialNumbers(table) {
    for (let i = 1, row; row = table.rows[i]; i++) {
        row.cells[0].innerText = i;
    }
}

const departmentPrograms = {
    CSE: [
        "B.Tech. Artificial Intelligence",
        "B.Tech. Computer Science and Engineering (Under Self Finance Scheme)",
        "B.Tech. Computer Science and Engineering ",
        "B.Tech. Computer Science and Engineering (Specialization : Machine Learning)",
        "B.Tech. Computer Science and Engineering (Specialization : Data Science)",
        "B.Tech. Computer Science and Engineering (Specialization : Cyber Security)",
        "B.Tech. Computer Science and Engineering (Specialization : Internet of Things)",
        "5 Year Integrated B.Tech.-M.Tech (ICT)",
        "5 Year Integrated B.Tech.-M.Tech (CSE) with Specialization - Artificial Intelligence and Robotics",
        "5 Year Integrated B.Tech.-M.Tech (CSE) with Specialization - Data Science",
        "5 Year Integrated B.Tech.-M.Tech (CSE) with Specialization - Software Engineering",
        "5 Year Integrated B.Tech.-M.Tech (CSE) with Specialization - Wireless Communication and Networks",
        "Bachelors in Computer Application (BCA)",
        "M.Tech. CSE (Specialization: Software Engineering)",
        "M.Tech. CSE (Specialization: Artificial Intelligence and Robotics)",
        "M.Tech. CSE (Specialization: Internet of Things)",
        "M.Tech. CSE (Specialization: Cyber Security)"
    ],
    IT: [
        "B.Tech. Information Technology",
        "5 Year Integrated B.Tech.-M.Tech (ICT)",
        "5 Year Integrated B.Tech.-M.Tech (IT) with Specialization - Artificial Intelligence and Robotics",
        "5 Year Integrated B.Tech.-M.Tech (IT) with Specialization - Data Science",
        "5 Year Integrated B.Tech.-M.Tech (IT) with Specialization - Software Engineering",
        "5 Year Integrated B.Tech.-M.Tech (IT) with Specialization - Wireless Communication and Networks",
        "Bachelors in Computer Application (BCA)",
        "M.Tech. IT (Specialization: Software Engineering)",
        "M.Tech. IT (Specialization: Artificial Intelligence and Robotics)",
        "M.Tech. IT (Specialization: Internet of Things)",
        "M.Tech. IT (Specialization: Cyber Security)"
    ],
    ECE: [
        "B.Tech. Electronics and Communication Engineering",
        "5 Year Integrated B.Tech.-M.Tech (ICT)",
        "5 Year Integrated B.Tech.-M.Tech (ECE) with Specialization - Artificial Intelligence and Robotics",
        "5 Year Integrated B.Tech.-M.Tech (ECE) with Specialization - Data Science",
        "5 Year Integrated B.Tech.-M.Tech (ECE) with Specialization - Software Engineering",
        "5 Year Integrated B.Tech.-M.Tech (ECE) with Specialization - Wireless Communication and Networks",
        "M.Tech. ECE (Specialization: Software Engineering)",
        "M.Tech. ECE (Specialization: Artificial Intelligence and Robotics)",
        "M.Tech. ECE (Specialization: Internet of Things)",
        "M.Tech. ECE (Specialization: Cyber Security)"
    ]
};

function updateProgramOptions() {
    const department = document.getElementById('department').value;
    const programSelect = document.getElementById('program');
    programSelect.innerHTML = '<option value="">Select Program</option>';
    if (department && departmentPrograms[department]) {
        departmentPrograms[department].forEach(program => {
            const option = document.createElement('option');
            option.value = program;
            option.textContent = program;
            programSelect.appendChild(option);
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('examForm');

    function calculateTotalAmount() {
        const backPaperTable = document.getElementById('back-paper');
        const totalAmountInput = document.getElementById('totalAmount');

        let rowCount = backPaperTable.rows.length - 1; // Exclude header row
        let totalAmount = rowCount * 1500;

        totalAmountInput.value = totalAmount;
    }

    // Add event listener for add/remove row
    form.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-remove-btn')) {
            calculateTotalAmount();
        }
    });

    // Initialize total amount calculation
    calculateTotalAmount();
});
