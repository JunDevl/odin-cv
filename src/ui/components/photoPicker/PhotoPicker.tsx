import "./photoPicker.css";

interface PhotoPickerProps {
  setPhoto: React.Dispatch<React.SetStateAction<File | null>>
}

const PhotoPicker = ({setPhoto}: PhotoPickerProps) => {
  const handleFile = (e: React.FormEvent<HTMLInputElement>) => {
    const picker = e.target as HTMLInputElement
    const file = picker.files?.item(0);

    if (!file) {
      picker.style.backgroundColor = "var(--white-1)";
      setPhoto(null);
      return
    };

    picker.style.backgroundImage = `url(${URL.createObjectURL(file)})`
    setPhoto(file);
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