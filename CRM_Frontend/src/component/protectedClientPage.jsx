import { useAuth } from "../controller/authController";
import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { Navigate } from "react-router-dom"; // Add this line

ProtectedClientPage.propTypes = {
	children: PropTypes.node,
};

export default function ProtectedClientPage ( { children } )
{
	const { currentUser, role } = useAuth();
	useEffect( () =>
	{
		if ( !currentUser )
		{
			return <Navigate to="/login" replace={ true } />;
		}
		if ( role !== "lecturer" && role !== "parent" && role !== "student" )
		{
			return <Navigate to="/error" replace={ true } />;
		}
	}, [] )





	return children;
}
