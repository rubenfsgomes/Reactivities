import { observer } from "mobx-react-lite"
import { Image, List, Popup } from "semantic-ui-react"
import { Profile } from "../../../app/models/profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees} : Props) {
    const styles = {
        borderColor: 'orange',
        borderWidth: 3
    }

    return (
        <List horizontal>
            {attendees.map(at => (
                <Popup
                    hoverable
                    key={at.username}
                    trigger={
                        <List.Item key={at.username} as={Link} to={`/profiles/${at.username}`}>
                            <Image 
                                size="mini" 
                                circular 
                                src={at.image || "/assets/user.png"} 
                                bordered
                                style={at.following ? styles : null}
                            />
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