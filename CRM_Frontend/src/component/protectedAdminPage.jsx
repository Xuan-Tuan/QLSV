import { useAuth } from "../controller/authController";
import { PropTypes } from "prop-types";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom"; // Add this line
import { AuthContext } from "./authContext";

ProtectedAdminPage.propTypes = {
	children: PropTypes.node,
};

export default function ProtectedAdminPage ( { children } )
{
	const { currentUser, role } = useContext( AuthContext );
	console.log( role );
	useEffect( () =>
	{
		if ( !currentUser )
		{
			return <Navigate to="/login" replace={ true } />;
		}
		if ( role !== "admin" )
		{
			return <Navigate to="/error" replace={ true } />;
		}
	}, [] )

	// if ( role !== "admin" )
	// {
	// 	return <Navigate to="/error" replace={ true } />;
	// }

	return children;
}
