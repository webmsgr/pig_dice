export function wait(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}


const alert_modal = document.getElementById("alert_modal")! as HTMLDivElement;
export function alert(data: string): Promise<void> {
    return new Promise((resolve) => {
        alert_modal.querySelector('#alert')!.textContent = data;
        alert_modal.classList.add('modal-show');
        alert_modal.querySelector('button')!.onclick = () => {
            alert_modal.classList.remove('modal-show');
            resolve();
        }
    })
}