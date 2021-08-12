# TechBlog



# User Model

- username
- password ? encrypted ?

# Post Model

-title
-contents
-post creator username (user_id : One-To-Many: One user will have many posts)
- date created (time stamp : true)

# Comment Mode

- comment text
- comment post (post_id)
- comment username (user_id : One-To-Many
one user will have many comments)
- date created (time stamp : true)

# View
- homepage
- single blog post page
- dashboard
- add post or popup modal
- put post to edit (possibly combine with add post - partial)

