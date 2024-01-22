import { observer } from "mobx-react-lite"
import { useStore } from "../../app/stores/store"
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { Button } from "semantic-ui-react";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileUpdate({setEditMode}: Props) {
    const {profileStore} = useStore();

    const {updateProfile, profile} = profileStore;

    const validationSchema = Yup.object({
        displayName: Yup.string().required('The display name is required')
    })

    return (
        <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
            onSubmit={values => {
                    updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
        >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name="displayName" placeholder="Display name" />
                    <MyTextArea rows={3} placeholder="Bio" name="bio" />
                    <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} 
                        floated="right" 
                        positive 
                        type="submit" 
                        content='Submit' 
                    />
                </Form>
            )}
        </Formik>
    )
})