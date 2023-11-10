import PropTypes from "prop-types";

const Input = ({ type, required, value, placeholder, onChange }) => {
	return (
		<input
			type={type}
			value={value}
			placeholder={placeholder}
			required={required}
			onChange={onChange}
		/>
	);
};
// type, placeholder, value, onChange, HtmlFor(igual que id), label, icon, width

Input.propTypes = {
	type: PropTypes.string.isRequired,
	required: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
};

export default Input;
