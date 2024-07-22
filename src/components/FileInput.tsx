import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/FileInput.module.css";

interface FileInputProp {
  name: string;
  value: string | File | null; // value는 File 객체 또는 null이어야 합니다.
  initialPreview: string;
  onChange: (name: string, value: string | File | null) => void;
}

export default function FileInput({
  name,
  value,
  initialPreview,
  onChange,
}: FileInputProp) {
  const [preview, setPreview] = useState<string>(initialPreview); // 이미지 미리보기 주소
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 제한 (5MB 이하)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하만 가능합니다.");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(name, base64String);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(name, null);
    }
  };

  const handleClearClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // 파일 선택 초기화
    }
    onChange(name, null);
  };

  useEffect(() => {
    if (value instanceof File) {
      const nextPreview = URL.createObjectURL(value);
      setPreview(nextPreview);

      return () => {
        URL.revokeObjectURL(nextPreview);
      };
    } else if (typeof value === "string") {
      setPreview(value);
    } else {
      setPreview(initialPreview);
    }
  }, [value, initialPreview]);

  return (
    <div>
      <div className={styles.imgWrapper}>
        <Image
          src={preview || "/preview_placeholder.svg"}
          width={preview ? 384 : 64}
          height={preview ? 311 : 64}
          alt="이미지 미리보기"
        />
        <label className={styles.fileSelectBtn} htmlFor="fileInput">
          <Image src="/file_select_btn.svg" width={64} height={64} alt="추가" />
        </label>
      </div>
      <input
        type="file"
        id="fileInput"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
        style={{ display: "none" }}
      />
      {value && (
        <button className="clearBtn" onClick={handleClearClick}>
          X
        </button>
      )}
    </div>
  );
}
