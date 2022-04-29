import React from "react";
import { Modal, Button } from "react-bootstrap";

function EditConfirm(props) {
    return (
        <>
            <Modal show={props.showModal} onHide={props.handleClose}>
                <Modal.Header closeButton className="bc-lightBlue">
                    <Modal.Title className="c-white">
                        Edit Operation {props.operationId}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>You will be redirect to the Edit page</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button
                        className="btn-lightBlue"
                        onClick={props.handleEdit}
                    >
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditConfirm;
