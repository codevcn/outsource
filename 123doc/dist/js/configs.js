document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    )
})

class CustomToast {
    success({ message, title }) {
        Swal.fire({
            ...(title ? { title } : {}),
            text: message,
            icon: 'success',
        })
    }
    error({ message, title }) {
        Swal.fire({
            ...(title ? { title } : {}),
            text: message,
            icon: 'error',
        })
    }
    info({ message }) {
        Swal.fire(message)
    }
}

const toast = new CustomToast()
