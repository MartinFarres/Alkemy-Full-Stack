import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteConfirm(props) {
    return (
        <>
            <Modal show={props.showModal} onHide={props.handleClose}>
                <Modal.Header closeButton className="bc-red">
                    <Modal.Title className="c-white">
                        Delete Operation {props.operationId}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>This action can't be undone!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button className="btn-red" onClick={props.handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteConfirm;
