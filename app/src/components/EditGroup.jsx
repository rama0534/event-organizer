import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button, Col, Form, Row, InputGroup } from "react-bootstrap";

const EditGroup = () => {
  const initialFormState = {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    events: [],
  };
  const [group, setGroup] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      fetch(`/api/group/${id}`)
        .then((res) => res.json())
        .then((data) => setGroup(data));
    }
  }, [id, setGroup]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroup({ ...group, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    await fetch(`/api/group${group.id ? `/${group.id}` : ""}`, {
      method: group.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });
    setGroup(initialFormState);
    navigate("/groups");
  };

  const title = (
    <h2 className="mt-3"> {group.id ? "Edit Group" : "Add a new group."} </h2>
  );

  return (
    <div>
      <Container>
        {title}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label> Group Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Group name"
                value={group.name || ""}
                onChange={(e) => setGroup({ ...group, name: e.target.value })}
              />
              <Form.Control.Feedback type="invalid">
                Please enter group name.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="2">
              <Form.Label> Number of Events</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="No Events"
                value={group.events.length || ""}
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                Please enter group name.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Address"
                value={group.address || ""}
                onChange={(e) =>
                  setGroup({ ...group, address: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Please enter address.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>City</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="city"
                  required
                  value={group.city || ""}
                  onChange={(e) => setGroup({ ...group, city: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a city name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                required
                value={group.state || ""}
                onChange={(e) => setGroup({ ...group, state: e.target.value })}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                value={group.country || ""}
                required
                onChange={(e) =>
                  setGroup({ ...group, country: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Country.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3">
              <Form.Label>Postal Code </Form.Label>
              <Form.Control
                type="text"
                placeholder="Postal Cod"
                value={group.postalCode || ""}
                required
                onChange={(e) =>
                  setGroup({ ...group, postalCode: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditGroup;
