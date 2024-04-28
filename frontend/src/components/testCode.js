// State variables needed:
/// showCommentForm (boolean)
/// commentPostValidation (string)

{(showCommentForm === false) ?

    (<Container>
      <Button 
      variant="primary" 
      onClick={() => setCommentForm(!showCommentForm)} 
      style={{ marginLeft: '79%', borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', fontSize: '15px', marginBottom: '20px' }}>Add comment</Button>
    </Container>
    ) :
    (<div>
        <Container>
          <Form>
          <Row>
          <Col>
        <Form.Group controlId="formTitle">
        <Form.Label>Caption</Form.Label>
            <Form.Control 
            type="text"  
            id="fileCaption"
            placeholder="Write a Ccomment"
            value={userComment}
            onChange={(e) => {setUserComment(e.target.value)}}
        required />
         </Form.Group>
         </Col>
         
    
        </Row>
          <Button
            style={{ borderColor: '#A39A9A', backgroundColor: "transparent", color: '#4D515A', marginLeft:'92%', marginBottom:'20px'}}
            onClick={() => {
                // First set validation if nothing is entered
            }}>Post Comment</Button>

        {commentPostValidation}     
        
        </Form>
        </Container>                      
    </div>)}