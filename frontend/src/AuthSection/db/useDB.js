export function deleteBlog(id, access) {
  if (access) {
    if (window.confirm("Are you sure to delete this blog?")) {
      fetch(`/blogs/delete/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(() => {
          alert("Blog deleted.");
        })
        .catch((err) => {
          alert("Error");
        });
    }
  }
}
