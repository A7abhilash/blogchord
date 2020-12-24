export async function getLoggedInUserDetails(id) {
  try {
    let res = await fetch(`/users/auth/${id}`);
    let data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    alert(error.msg);
  }
}

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

export async function addToBookmark(blogId, userId) {
  try {
    const newBlog = {
      blogId,
      userId,
    };
    let res = await fetch("/users/addBookmark", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });
    let data = await res.json();
    return data;
  } catch (error) {
    alert(error.msg);
  }
}

export async function updateBookmark(updatedList, userId) {
  console.log(updatedList);
  try {
    const updateList = {
      blogs: updatedList,
      userId,
    };
    let res = await fetch("/users/bookmarks", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateList),
    });
    let data = await res.json();
    return data;
  } catch (error) {
    alert(error.msg);
  }
}
