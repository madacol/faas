<script>
    import CameraIcon from "./CameraIcon.svelte"
    import ProfileImage from "./ProfileImage.svelte"
    import Cropper from 'cropperjs';
    import 'cropperjs/dist/cropper.css';

    /** @type {string} */
    export let src

    /** @type {string} */
    let croppedImage;

    /**
     * @type {Cropper | null}
     */
    let cropper = null;

    /**
     * @param {string} src
     */
    function resizeImageSrc(src, minDimension = 800) {
        return new Promise((resolve) => {

            const img = new Image();

            img.onload = function () {
                let width, height;

                // Calculate new dimensions while preserving the aspect ratio
                if (img.width < img.height) {
                    width = minDimension;
                    height = (minDimension * img.height) / img.width;
                } else {
                    height = minDimension;
                    width = (minDimension * img.width) / img.height;
                }

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;

                // @ts-ignore
                ctx.drawImage(img, 0, 0, width, height);

                const resizedBase64String = canvas.toDataURL("image/jpeg");
                resolve(resizedBase64String);
            }

            img.src = src;

        })
    }

    /**
     * @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} event
     */
    function onFileChange(event) {
        if (!event?.currentTarget?.files?.length) return;

        const file = event.currentTarget.files[0];
        const reader = new FileReader();

        reader.onload = async function (event) {
            // @ts-ignore
            const base64String = event.target.result;
            // Do something with the base64String, like displaying it or sending it to the server
            if (typeof base64String !== 'string') {
                console.error('Result is not a string', base64String);
                return;
            }

            src = await resizeImageSrc(base64String, 2000);
        };

        reader.readAsDataURL(file);
    }

    async function cropImage() {
        croppedImage = await resizeImageSrc(
            // @ts-ignore
            cropper.getCroppedCanvas().toDataURL("image/jpeg")
            , 800
        )
    }

    /**
     * @param {{ target: any; }} event
     */
    function onImageLoad(event) {
        if (cropper) {
            cropper.destroy();
        }
        const imageElement = event.target;
        cropper = new Cropper(imageElement, {
            viewMode: 1,
            aspectRatio: 1,
            dragMode: 'move',
            cropBoxResizable: false,
            cropBoxMovable: false,
            guides: false,
            background: false,
            autoCropArea: 1,
            movable: true,
        });

        imageElement.addEventListener('cropend', cropImage);
        imageElement.addEventListener('ready', cropImage);
    }
</script>

<div class="profile-picture">
    <ProfileImage on:load={onImageLoad} {src} />
    <label class="cameraicon">
        <CameraIcon />
        <input type="file" hidden accept="image/*" on:change={onFileChange} on:change />
    </label>
    <input type="hidden" name="image_data_url" value={croppedImage} />
</div>

<style>
    .profile-picture {
        position: relative;
        margin: auto;
    }
    .profile-picture > .cameraicon {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
        background-color: #06517E;
        border: 0.2rem solid var(--light-mode-white-01, #FFF);
        box-shadow: 0 0.3rem 0.9rem 0 rgba(6, 81, 126, 0.18);
        cursor: pointer;
    }
    .cameraicon:hover {
        background-color: #044168;
    }
    :global(.cropper-crop-box), :global(.cropper-view-box) {
      border-radius: 50%;
    }
</style>