document.addEventListener("DOMContentLoaded", () => {
    const shapes = document.querySelectorAll(".shape");
    const dropzone = document.getElementById("dropzone");
    const successMessage = document.getElementById("successMessage");
    const resetButton = document.getElementById("resetButton");
    const shapesContainer = document.querySelector(".shapes-container");

    shapes.forEach(shape => {
        shape.addEventListener("dragstart", dragStart);
        shape.addEventListener("dragend", dragEnd);
    });

    dropzone.addEventListener("dragover", dragOver);
    dropzone.addEventListener("dragenter", dragEnter);
    dropzone.addEventListener("dragleave", dragLeave);
    dropzone.addEventListener("drop", drop);

    function dragStart(e) {
        e.dataTransfer.setData("text", e.target.id);
        setTimeout(() => e.target.classList.add("hidden"), 0);
    }

    function dragEnd(e) {
        e.target.classList.remove("hidden");
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        dropzone.style.backgroundColor = "#f8bbd0";
    }

    function dragLeave(e) {
        dropzone.style.backgroundColor = "#fce4ec";
    }

    function drop(e) {
        e.preventDefault();
        dropzone.style.backgroundColor = "#fce4ec";
        const id = e.dataTransfer.getData("text");
        const draggable = document.getElementById(id);

        if (!dropzone.contains(draggable)) {
            dropzone.appendChild(draggable);
            draggable.style.position = "absolute";
            draggable.style.top = `${dropzone.children.length === 1 ? 0 : 75}px`;
            draggable.style.left = "0";
        }
        checkWin();
    }

    function checkWin() {
        if (dropzone.children.length === 2) {
            successMessage.style.display = "block";
            resetButton.style.display = "block";
        }
    }

    resetButton.addEventListener("click", () => {
        dropzone.innerHTML = "";
        successMessage.style.display = "none";
        resetButton.style.display = "none";
        shapes.forEach(shape => shapesContainer.appendChild(shape));
    });
});
