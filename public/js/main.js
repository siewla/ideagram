const addComment = () =>{
    $('.submit-comment').on('click', (event) =>{
        const id = $(event.currentTarget).attr('id');
        const idArray = id.split('&');
        const albumName = idArray[0];
        const imageIndex = idArray[1];
        const $div = $(event.currentTarget).parent().parent();
        const $allImageComments = $div.siblings('.image-all-comments-container');
        const $newComment = $(event.currentTarget).parent().siblings().children('.new-comment');

        const newCommentContent = $newComment.val();
        $newComment.val('');
        

        const promise = $.ajax({
            url: `/api/comment/${albumName}/${imageIndex}/?comment=${newCommentContent}`
        });

        promise.then(
            (data) => {
                const newData = JSON.parse(data);
                const allImageComments = newData.albumData.images[imageIndex].comments;
                const newComment = allImageComments[allImageComments.length - 1].comment;
                // const commentedTime = allImageComments[allImageComments.length - 1].commentedAt;
                
                $allImageComments.append(`
                <div class="image-individual-comment"><h3 class="comment-style">${newComment}</h3>
                    <div class="show-comment-footer"> 
                        <h4 class='footer-text'>commented by <strong class="own-comment">you</strong></h4>               
                        <h5 class='footer-text'>a few seconds ago</h5>
                    </div>
                </div>`);
                return data;
            },
            ()=>{
                console.log('bad request');
            }
        );
        return false;
    });
};



$(()=>{
    addComment();
});

