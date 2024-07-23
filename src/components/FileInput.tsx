import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/FileInput.module.css";

interface FileInputProp {
  name: string;
  value: string | File | null;
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
  const type = value ? "modify" : "select";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 이름 유효성 검사
      if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
        alert(
          "파일 이름은 영어, 숫자, 점(.), 밑줄(_), 하이픈(-)만 포함해야 합니다."
        );
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }

      // 파일 크기 제한 (5MB 이하)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하만 가능합니다.");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }

      // FileReader를 사용하여 파일을 base64 문자열로 변환
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

  useEffect(() => {
    // value가 File 객체인 경우
    if (value instanceof File) {
      // File 객체로부터 URL을 생성하여 이미지 미리보기 설정
      const nextPreview = URL.createObjectURL(value);
      setPreview(nextPreview);

      return () => {
        URL.revokeObjectURL(nextPreview);
      };

      // value가 문자열(이미 URL이나 base64 형식)인 경우
      // 해당 문자열을 그대로 미리보기로 설정
    } else if (typeof value === "string") {
      setPreview(value);

      // value가 null이거나 undefined인 경우
      // 초기 미리보기 이미지(initialPreview)를 사용
    } else {
      setPreview(initialPreview);
    }
  }, [value, initialPreview]);

  return (
    <div>
      <div className={styles.imgWrapper}>
        {preview ? (
          <Image
            className={styles.imgPreview}
            src={preview}
            width={384}
            height={311}
            alt="이미지 미리보기"
          />
        ) : (
          <Image
            src={"/preview_placeholder.svg"}
            width={64}
            height={64}
            alt="이미지 미리보기"
          />
        )}
        <label className={styles.fileSelectBtn} htmlFor="fileInput">
          <div className={`${styles.btn} ${styles[type]}`}>
            <Image
              src={`/file_${type}.svg`}
              width={24}
              height={24}
              alt="수정"
            />
          </div>
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
    </div>
  );
}
