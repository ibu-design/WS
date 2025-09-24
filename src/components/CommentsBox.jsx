const CommentsBox = ({ comments, setComments }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>コメント・備考</h3>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="ここにコメントを書いてください"
        rows={4}
        style={{ width: "100%", padding: "8px" }}
      />
    </div>
  );
};

export default CommentsBox;
