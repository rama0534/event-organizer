import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['XSRF-TOKEN']);

  useEffect(() => {
    setLoading(true);
    fetch("api/groups")
        .then((res) => res.json())
        .then((data) => setGroups(data))
        .finally(() => setLoading(false));
  }, []);

  const remove = async (id) => {
    await fetch(`/api/group/${id}`, {
      method: "DELETE",
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      credentials: 'include'
    }).then(() => {
      let updatedGroups = [...groups].filter(i => i.id !== id);
      setGroups(updatedGroups);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const groupList = groups.map((group) => {
    const address = `${group.address || ""} ${group.city || ""} ${
        group.state || ""
    }`;
    return (
        <tr key={group.id}>
          <td style={{ whiteSpace: "nowrap" }}>{group.name}</td>
          <td>{address}</td>
          <td>
            {group.events.map((event) => (
                <div key={event.id}>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(new Date(event.date))}{" "}
                  : {event.title}
                </div>
            ))}
          </td>
          <td>
            <Button
                size="sm"
                as={Link}
                to={`/groups/` + group.id}
                variant="primary"
            >
              Edit
            </Button>{" "}
            <Button size="sm" variant="danger" onClick={() => remove(group.id)}>
              Delete
            </Button>
          </td>
        </tr>
    );
  });

  return (
      <div className="container d-flex justify-content-center">
        <div className="col-md-8">
          <div className="float-end mb-3 mt-lg-5">
            <Button as={Link} to={`/groups/new`} variant="success">
              Add Group
            </Button>
          </div>
          <h3 className="mt-lg-5">List groups</h3>
          {groups.length === 0 ? (
              <p>
                There are no groups. Click on the add group button to create a
                group.
              </p>
          ) : (
              <Table>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Events</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>{groupList}</tbody>
              </Table>
          )}
        </div>
      </div>
  );
};

export default GroupList;
