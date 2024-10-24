
# Cubid SDK

**Cubid SDK** provides a simple interface for interacting with the Cubid API to manage identity, location, and score data for users, and to securely store secrets. The SDK is designed for easy integration into dApps or web applications that require identity management using the Cubid Protocol.

## Features

- **User Identity Management**: Fetch and manage user identity data.
- **Location Data**: Retrieve approximate, rough, or exact location data for a user.
- **User Score**: Fetch the trust score of a user.
- **User Creation**: Create new users with email and phone number.
- **Secret Storage**: Save and manage secrets for users.

## Installation

You can install the SDK via npm:

```bash
npm install cubid-sdk
```

For more information, visit the [npm package page](https://www.npmjs.com/package/cubid-sdk).

## API Keys

Use Cubid's [Admin Console](https://admin.cubid.me/admin) to configure your App and get provisioned with a dApp ID and API Keys.

## Usage

Here's an example of how to use the Cubid SDK:

### Initialization

```javascript
const CubidSDK = require('cubid-sdk');

// Initialize with your dapp_id and api_key
const cubid = new CubidSDK('your_dapp_id', 'your_api_key');
```

### API Methods (examples, non-exhaustive list)

#### 1. **Create a New User**

```javascript
cubid.createUser({ email: 'user@example.com', phone: '1234567890' })
  .then(response => console.log('New user created:', response))
  .catch(error => console.error('Error creating user:', error));
```

#### 2. **Fetch Identity Data**

```javascript
cubid.fetchIdentity({ user_id: 'user123' })
  .then(response => console.log('Identity data:', response))
  .catch(error => console.error('Error fetching identity:', error));
```

#### 3. **Fetch User Location (Exact)**

```javascript
cubid.fetchExactLocation({ user_id: 'user123' })
  .then(response => console.log('Exact location data:', response))
  .catch(error => console.error('Error fetching location:', error));
```

#### 4. **Fetch User Location (Approximate)**

```javascript
cubid.fetchApproxLocation({ user_id: 'user123' })
  .then(response => console.log('Approximate location data:', response))
  .catch(error => console.error('Error fetching approximate location:', error));
```

#### 5. **Fetch Rough Location (Rough)**

```javascript
cubid.fetchRoughLocation({ user_id: 'user123' })
  .then(response => console.log('Rough location data:', response))
  .catch(error => console.error('Error fetching rough location:', error));
```

#### 6. **Fetch User Data**

```javascript
cubid.fetchUserData({ user_id: 'user123' })
  .then(response => console.log('User data:', response))
  .catch(error => console.error('Error fetching user data:', error));
```

#### 7. **Fetch Score**

```javascript
cubid.fetchScore({ user_id: 'user123' })
  .then(response => console.log('Score data:', response))
  .catch(error => console.error('Error fetching score:', error));
```
#### 8. **Save Secret for a User**

```javascript
cubid.saveSecret({ user_id: 'user123', secret: 'mySuperSecretKey' })
  .then(response => console.log('Secret saved:', response))
  .catch(error => console.error('Error saving secret:', error));
```

### API Reference

For more detailed information about the API endpoints and parameters, check the [Cubid API Documentation](https://docs.cubid.me/#/api-reference).

### Full Source Code

You can view the full source code for this SDK [here](https://github.com/Cubid-Me/cubid-sdk/blob/master/src/index.js).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
