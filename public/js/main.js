const addComment = () =>{
    $('.submit-comment').on('click', (event) =>{
        const id = $(event.currentTarget).attr('id');
        const idArray = id.split('&');
        const albumName = idArray[0];
        const imageIndex = idArray[1];
        const $div = $(event.currentTarget).parent();
        const $allComments= $div.siblings('.image-all-comments-container');
        const $newComment = $(event.currentTarget).siblings('.new-comment');

        const newCommentContent = $newComment.val();
        $newComment.val('');

        const promise = $.ajax({
            url: `/api/comment/${albumName}/${imageIndex}/?comment=${newCommentContent}`
        });

        promise.then(
            (data) => {
                // const newData = JSON.parse (data);
                // const allImageComments = newData.images[imageIndex].comments;
                // const newComment = allImageComments[allImageComments.length - 1];

                $allComments.append('<div class="image-individual-comment"><h3>New Comment</h3></div>');
                return data;
            },
            ()=>{
                console.log('bad request');
            });
        return false;
    });
};



$(()=>{
    $('.file-upload').file_upload();
    addComment();
});

