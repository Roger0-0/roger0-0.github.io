async function loadCSV() {
    // I export all of my books on Goodreads to csv,
    // This function parses that csv for only book club books
    try {
        const response = await fetch('goodreads_library_export.csv');
        const data = await response.text();

        // Use jquery-csv to parse the CSV data
        const parsedData = $.csv.toObjects(data);

        // Filter for book club books
        const validData = parsedData.filter(row => {
            return row["Bookshelves"].includes('book-club');
        });

        validData.sort((a, b) => {
            const dateA = new Date(a["Date Read"]);
            const dateB = new Date(b["Date Read"]);
            return dateB - dateA; // Sort in descending order
        });

        const tableBody = $('#past-books-table tbody');
        validData.forEach(row => {
            const tr = $('<tr></tr>');
            tr.append(`<td>${row["Title"]}</td>`);
            tr.append(`<td>${row["Author"]}</td>`);
            tr.append(`<td>${row["My Rating"]}</td>`);
            tr.append(`<td>${row["Date Read"]}</td>`);
            tableBody.append(tr);
        });
    } catch (error) {
        console.error('Error loading CSV:', error);
    }
}
// Call the loadCSV function when the document is ready
$(document).ready(function() {
    loadCSV();
});
