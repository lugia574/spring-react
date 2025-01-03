/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import InputText from "../components/common/InputText";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import { httpClient } from "../api/http";
import { Button } from "../components/common/Button";
// interface Props {}

const CKEDITOR_KEY = import.meta.env.VITE_CKEDITOR_KEY;

// 이미지 업로드 함수
const uploadImage = async (file: File) => {
  try {
    if (!file) return null;
    const formData = new FormData();
    formData.append("posts", file);

    const response = await httpClient.post("/posts/upload/img", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to upload image. Status code: ${response.status}`
      );
    }

    return response.data.url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// CKEditor 업로드 어댑터
class MyUploadAdapter {
  loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    try {
      const file = await this.loader.file;
      const imageUrl = await uploadImage(file);
      return { default: imageUrl };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  abort() {
    console.log("File upload aborted.");
  }
}

// CKEditor 플러그인
function MyCustomUploadAdapterPlugin(editor: {
  plugins: {
    get: (arg0: string) => {
      createUploadAdapter: (loader: any) => MyUploadAdapter;
    };
  };
}) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

const PostWritePage = () => {
  const [postTitle, setPostTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(postTitle);
    console.log(content);
  };
  return (
    <PostWritePageStyle>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="post-title">
          <InputText
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="포스트 제목을 입력해주세요."
          />
        </div>

        <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
            licenseKey: CKEDITOR_KEY,
            extraPlugins: [MyCustomUploadAdapterPlugin],
            placeholder: "내용을 입력하세요",
          }}
          onChange={(_event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <Button $radius="default" $scheme="normal" $size="medium">
          올리기
        </Button>
      </form>
    </PostWritePageStyle>
  );
};

const PostWritePageStyle = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  .post-form {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 1rem;
  }

  .post-title {
    width: 100%;
  }

  .ck {
    width: 100%;
  }
  .ck-editor__editable_inline {
    min-height: 400px;
    max-height: 600px;
    /* width: 970px; */
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .ck-editor__editable {
      min-height: 300px;
    }
  }
`;

export default PostWritePage;
