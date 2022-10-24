<Col md={5}>
          <h1>{setlist.name}</h1>
          <p>{setlist.timestamp}</p>

          {setlist.songs.length >= 1 ? (
            <ListGroup variant="flush" className="align-items-start">
              {setlist.songs.map((song) => {
                return (
                  <ListGroup.Item key={song.id}>
                    <Nav>
                      <Nav.Item>
                        <LinkContainer to={`/library/${song.id}`}>
                          <Nav.Link>
                            <Stack direction="horizontal" gap={3}>
                              <Image src={song.thumbnail_url} fluid width={100} height={100} rounded />
                              <Stack gap={1} className="my-auto">
                                <span>{song.title}</span>
                                <span className="text-muted">by {song.artist}</span>
                              </Stack>
                            </Stack>
                          </Nav.Link>
                        </LinkContainer>
                      </Nav.Item>
                    </Nav>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <p className="text-muted">Your setlist is empty</p>
          )}

          {editOpen && (
            <SetlistEditForm
              handleFormSubmit={handleFormSubmit}
              handleSelectChange={handleSelectChange}
              setlistNameValue={setlistNameValue}
              setSetlistNameValue={setSetlistNameValue}
              selectSongs={selectSongs}
              librarySongs={librarySongs}
              buttonMessage={'Save setlist'}
              toggleFormOpen={toggleFormOpen}
            />
          )}
          {!editOpen && <EditButtons buttonProps={{ toggleFormOpen, handleShowModal }} />}

          <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title>Warning!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this setlist?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="warning" onClick={handleDelete}>
                Yes!
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>