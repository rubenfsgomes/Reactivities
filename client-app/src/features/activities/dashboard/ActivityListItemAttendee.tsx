import { observer } from "mobx-react-lite"
import { Image, List, Popup } from "semantic-ui-react"
import { Profile } from "../../../app/models/profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees} : Props) {
    return (
        <List horizontal>
            {attendees.map(at => (
                <Popup
                    hoverable
                    key={at.username}
                    trigger={
                        <List.Item key={at.username} as={Link} to={`/profiles/${at.username}`}>
                            <Image size="mini" circular src={at.image || "/assets/user.png"} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={at} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})