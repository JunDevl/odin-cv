import "./photoPicker.css";

interface Props {
  photoState: [photo: File | undefined, setPhoto: React.Dispatch<React.SetStateAction<File | undefined>>]
}

const PhotoPicker = ({photoState}: Props) => {
  const [photo, setPhoto] = photoState;

  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    const picker = e.target as HTMLInputElement
    const file = picker.files?.item(0);

    if (!file) {picker.style.backgroundColor = "var(--white-1)"; return;};

    picker.style.backgroundImage = `url(${URL.createObjectURL(file)})`
  }
  
  return (
    <input 
      type="file" 
      accept=".png, .jpg, .jpeg" 
      name="photo" id="photo" 
      onInput={(e) => handleFile(e)}
    />
  )
}

export default PhotoPicker