import { SyntheticEvent, useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { Card, Grid, Header, Tab, TabProps, Image } from "semantic-ui-react";
import { UserActivity } from "../../app/models/profile";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: {key: 'past'}},
    { menuItem: 'Hosting', pane: {key: 'hosting'}}
];

export default observer(function ProfileActivities() {
    const {profileStore} = useStore();
    const {loadActivities, loadingActivities, profile, userActivities} = profileStore;

    useEffect(() => {
        console.log("ProfileActivities useEffect - Load activities");
        loadActivities(profile!.username);
    }, [loadActivities, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadActivities(profile!.username, panes[data.activeIndex as number].pane.key);
    };

    console.log("ProfileActivities rendering - profile:", profile, "userActivities:", userActivities);

    // Add a check for existence of profile and userActivities
    if (!profile || !userActivities) {
        console.log("ProfileActivities rendering - returning null");
        return null; // or you can render a loading state
    }

    console.log("ProfileActivities rendering - rendering content");

    return (
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon={'calendar'} content={'Activities'} /> 
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab 
                        panes={panes}
                        menu={{ secondary: true, pointing: true}}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userActivities && userActivities.map((activity: UserActivity) => (
                            <Card
                                as={Link}
                                to={`/activities/${activity.id}`}
                                key={activity.id}
                            >
                                <Image 
                                    src={`/assets/categoryImages/${activity.category}.jpg`}
                                    style={{ minHeight: 100, objectFit: 'cover'}}
                                />
                                <Card.Content>
                                    <Card.Header textAlign="center">
                                        {activity.title}
                                    </Card.Header>
                                    <Card.Meta textAlign="center">
                                        <div>{format(new Date(activity.date), 'do LLL')}</div>
                                        <div>{format(new Date(activity.date), 'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})