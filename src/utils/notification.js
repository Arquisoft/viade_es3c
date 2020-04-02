import { ldflexHelper } from './index';

export const sendNotification = async (friend, content, createNotification, to) => {
  try {
    if (to) {
      return createNotification(content, to);
    }
    /**
     * If the friend doesn't have an inbox, show an error
     */
    throw new Error('Error: Your friend does not have an available inbox');
  } catch (error) {
    throw new Error(error);
  }
};

export const findUserInboxes = async paths => {
  try {
    let inboxes = [];

    for await (const path of paths) {
      const { path: currentPath } = path;
      const inbox = await ldflexHelper.discoverInbox(currentPath);

      if (inbox) {
        inboxes = [...inboxes, { ...path, path: inbox }];
      }
    }

    return inboxes;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDefaultInbox = (inboxes, inbox1, inbox2) =>
  inboxes.find(inbox => inbox.name === inbox1) || inboxes.find(inbox => inbox.name === inbox2);


  
  /**
   * This method generates an invitation (RDF) for a chess game.
   * @param baseUrl: the base url used to generate new urls.
   * @param gameUrl: the url of the game.
   * @param userWebId: the WebId of the player sending the invitation.
   * @param opponentWebId: the WebId of the opponent to whom the invitation is sent.
   * @returns {Promise<string>}
   */

  export const generateInvitation = async (baseUrl, gameUrl, userWebId, opponentWebId) {
    const invitationUrl = await this.generateUniqueUrlForResource(baseUrl);
    const notification = `<${invitationUrl}> a <${namespaces.schema}InviteAction>.`;
    const sparqlUpdate = `
    <${invitationUrl}> a <${namespaces.schema}InviteAction>;
      <${namespaces.schema}event> <${gameUrl}>;
      <${namespaces.schema}agent> <${userWebId}>;
      <${namespaces.schema}recipient> <${opponentWebId}>.
  `;

    return {
      notification,
      sparqlUpdate
    };
  }

