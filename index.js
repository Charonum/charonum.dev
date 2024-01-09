document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const tiltElements = document.querySelectorAll(".tilt");
        const pairs = [
            [0, 4],
            [0, 5],
            [1, 6],
            [2, 7],
            [3, 8]
        ];
        pairs.forEach(function(pair, pairIndex) {
            pair.forEach(function(index) {
                setTimeout(function() {
                    tiltElements[index].classList.add("fade-in");
                }, pairIndex * 150);
            });
        });
    }, 1000);
});
