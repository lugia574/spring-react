import { PostWritePageStyle } from "./PostWritePage";
import { useEffect, useState } from "react";
import InputText from "../components/common/InputText";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button } from "../components/common/Button";
import { usePost } from "../hook/usePost";
import { useParams } from "react-router-dom";
// interface Props {}

const CKEDITOR_KEY = import.meta.env.VITE_CKEDITOR_KEY;

const PostEditPage = () => {
  const { updatePost, usePostDetail } = usePost();
  const { id } = useParams();
  const postId = id && /^[0-9]+$/.test(id || "") ? parseInt(id, 10) : 0;
  const [content, setContent] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const { data } = usePostDetail(postId);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updatePost(postId, { title: postTitle, content });
  };

  useEffect(() => {
    setContent(data?.content ? data.content : "");
    setPostTitle(data?.title ? data.title : "");
  }, []);
  return (
    <PostWritePageStyle>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="post-title">
          <InputText
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="포스트 제목을 입력해주세요."
          />
        </div>

        <CKEditor
          editor={ClassicEditor}
          data={content}
          config={{
            licenseKey: CKEDITOR_KEY,
            extraPlugins: [],
            placeholder: "내용을 입력하세요",
          }}
          onChange={(_event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <Button $radius="default" $scheme="normal" $size="medium">
          수정
        </Button>
      </form>
    </PostWritePageStyle>
  );
};

// const PostEditPageStyle = styled.div``;

export default PostEditPage;
