/**
 * ATHLETIX Social Sports Community Engine
 * Feed rendering, dynamic post publishing, real-time likes & comment threads,
 * player connections, and trending sports hashtags.
 */

const CommunityEngine = {
  feedFilter: 'all',

  init() {
    this.bindEvents();
    this.renderFeed();
    this.renderSuggestedPlayers();
    this.renderTrendingTopics();
  },

  bindEvents() {
    // Post Publishing
    const publishBtn = document.getElementById('btnPublishPost');
    if (publishBtn) {
      publishBtn.addEventListener('click', () => this.publishNewPost());
    }

    // Like toggle & Comments toggle
    document.addEventListener('click', (e) => {
      // Like button
      const likeBtn = e.target.closest('[data-like-post]');
      if (likeBtn) {
        const postId = likeBtn.getAttribute('data-like-post');
        this.toggleLike(postId, likeBtn);
      }

      // Comment toggle
      const commentBtn = e.target.closest('[data-toggle-comments]');
      if (commentBtn) {
        const postId = commentBtn.getAttribute('data-toggle-comments');
        const commentsContainer = document.getElementById(`comments-${postId}`);
        if (commentsContainer) {
          commentsContainer.style.display = commentsContainer.style.display === 'none' ? 'flex' : 'none';
        }
      }

      // Add comment submit
      const addCommentBtn = e.target.closest('[data-submit-comment]');
      if (addCommentBtn) {
        const postId = addCommentBtn.getAttribute('data-submit-comment');
        this.addComment(postId);
      }

      // Player connect button toggle
      const connectBtn = e.target.closest('[data-connect-player]');
      if (connectBtn) {
        const playerId = connectBtn.getAttribute('data-connect-player');
        this.toggleConnect(playerId, connectBtn);
      }

      // Trending topic click
      const topicTag = e.target.closest('[data-topic-tag]');
      if (topicTag) {
        const tag = topicTag.getAttribute('data-topic-tag');
        App.showToast(`Filtering feed by ${tag}`, 'info');
      }
    });
  },

  renderFeed() {
    const feedContainer = document.getElementById('communityFeedList');
    if (!feedContainer) return;

    feedContainer.innerHTML = ATHLETIX_DATA.communityPosts.map(post => `
      <div class="feed-post-card" id="post-${post.id}">
        <div class="post-header">
          <div class="post-author-box">
            <img src="${post.avatar}" alt="${post.author}" class="post-author-avatar">
            <div>
              <div class="post-author-name">${post.author}</div>
              <div class="post-author-meta">${post.role} • ${post.timestamp}</div>
            </div>
          </div>
          <span class="badge badge-emerald">${post.sportBadge}</span>
        </div>

        <div class="post-content-text">${post.content}</div>

        ${post.media ? `
          <div class="post-media-container">
            <img src="${post.media}" alt="Post Media" class="post-media-img">
          </div>
        ` : ''}

        <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
          ${post.tags.map(t => `<span style="font-size:0.78rem; color:var(--cyan); font-weight:600;">${t}</span>`).join(' ')}
        </div>

        <div class="post-engagement-bar">
          <button class="engagement-btn ${post.isLiked ? 'liked' : ''}" data-like-post="${post.id}">
            <span>${post.isLiked ? '❤️' : '🤍'}</span>
            <span class="like-count">${post.likes}</span> Likes
          </button>
          <button class="engagement-btn" data-toggle-comments="${post.id}">
            <span>💬</span>
            <span>${post.comments.length}</span> Comments
          </button>
          <button class="engagement-btn" onclick="App.showToast('🔗 Post link copied to clipboard!', 'info')">
            <span>↗️</span> Share
          </button>
        </div>

        <!-- Comments Thread Container -->
        <div class="post-comments-container" id="comments-${post.id}">
          <div style="display:flex; gap:0.6rem; margin-bottom:0.5rem;">
            <input type="text" id="input-comment-${post.id}" placeholder="Write a comment..." class="newsletter-input-group" style="padding:0.6rem 0.9rem; flex:1; border-radius:var(--radius-sm); font-size:0.85rem; background:var(--bg-surface); border:1px solid var(--glass-border); color:white;">
            <button class="btn btn-sm btn-primary" data-submit-comment="${post.id}">Reply</button>
          </div>

          <div class="comments-list" id="comment-list-${post.id}">
            ${post.comments.map(c => `
              <div class="comment-item">
                <div style="flex:1;">
                  <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
                    <span class="comment-author-name">${c.author}</span>
                    <span style="font-size:0.7rem; color:var(--text-muted);">${c.time}</span>
                  </div>
                  <div class="comment-text">${c.text}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  },

  publishNewPost() {
    const textarea = document.getElementById('newPostTextarea');
    const content = textarea?.value.trim();
    if (!content) {
      App.showToast('Please enter some text for your post', 'warning');
      return;
    }

    const sportSelect = document.getElementById('newPostSportSelect')?.value || 'football';
    const sportName = ATHLETIX_DATA.sports.find(s => s.id === sportSelect)?.name || 'Sports';

    const newPost = {
      id: 'post-' + Date.now(),
      author: ATHLETIX_DATA.currentUser.name,
      handle: ATHLETIX_DATA.currentUser.handle,
      avatar: ATHLETIX_DATA.currentUser.avatar,
      role: 'Diamond Athlete • MVP',
      timestamp: 'Just now',
      sport: sportSelect,
      sportBadge: `⚡ ${sportName}`,
      content: content,
      media: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=800&q=80',
      likes: 1,
      isLiked: true,
      comments: [],
      shares: 0,
      tags: ['#AthletixCommunity', `#${sportName.replace(/\s+/g, '')}`]
    };

    ATHLETIX_DATA.communityPosts.unshift(newPost);
    textarea.value = '';
    this.renderFeed();
    App.showToast('✨ Post published to Athletix Community!', 'success');
  },

  toggleLike(postId, buttonEl) {
    const post = ATHLETIX_DATA.communityPosts.find(p => p.id === postId);
    if (!post) return;

    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;

    const countEl = buttonEl.querySelector('.like-count');
    if (countEl) countEl.textContent = post.likes;

    if (post.isLiked) {
      buttonEl.classList.add('liked');
      buttonEl.querySelector('span').textContent = '❤️';
    } else {
      buttonEl.classList.remove('liked');
      buttonEl.querySelector('span').textContent = '🤍';
    }
  },

  addComment(postId) {
    const input = document.getElementById(`input-comment-${postId}`);
    const text = input?.value.trim();
    if (!text) return;

    const post = ATHLETIX_DATA.communityPosts.find(p => p.id === postId);
    if (!post) return;

    const newComment = {
      author: ATHLETIX_DATA.currentUser.name,
      handle: ATHLETIX_DATA.currentUser.handle,
      text: text,
      time: 'Just now'
    };

    post.comments.push(newComment);
    input.value = '';

    const listEl = document.getElementById(`comment-list-${postId}`);
    if (listEl) {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment-item';
      commentDiv.innerHTML = `
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem;">
            <span class="comment-author-name">${newComment.author}</span>
            <span style="font-size:0.7rem; color:var(--text-muted);">${newComment.time}</span>
          </div>
          <div class="comment-text">${newComment.text}</div>
        </div>
      `;
      listEl.appendChild(commentDiv);
    }

    App.showToast('💬 Comment added!', 'info');
  },

  renderSuggestedPlayers() {
    const container = document.getElementById('suggestedPlayersContainer');
    if (!container) return;

    container.innerHTML = ATHLETIX_DATA.suggestedPlayers.map(p => `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem 0; border-bottom:1px solid var(--glass-border);">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <img src="${p.avatar}" alt="${p.name}" style="width:38px; height:38px; border-radius:50%; object-fit:cover;">
          <div>
            <div style="font-size:0.85rem; font-weight:700; color:white;">${p.name}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">${p.sport} • <span style="color:var(--emerald-neon); font-weight:600;">${p.compatibility}</span></div>
          </div>
        </div>
        <button class="btn btn-sm ${p.status === 'connected' ? 'btn-secondary' : 'btn-outline-emerald'}" data-connect-player="${p.id}">
          ${p.status === 'connected' ? 'Connected' : p.status === 'requested' ? 'Pending' : '+ Connect'}
        </button>
      </div>
    `).join('');
  },

  toggleConnect(playerId, btn) {
    const player = ATHLETIX_DATA.suggestedPlayers.find(p => p.id === playerId);
    if (!player) return;

    if (player.status === 'connect') {
      player.status = 'requested';
      btn.textContent = 'Requested';
      btn.className = 'btn btn-sm btn-secondary';
      App.showToast(`🤝 Connection request sent to ${player.name}!`, 'success');
    } else if (player.status === 'requested') {
      player.status = 'connected';
      btn.textContent = 'Connected';
      App.showToast(`🎉 You and ${player.name} are now connected!`, 'success');
    }
  },

  renderTrendingTopics() {
    const container = document.getElementById('trendingTopicsContainer');
    if (!container) return;

    container.innerHTML = ATHLETIX_DATA.trendingTopics.map(t => `
      <div style="padding:0.6rem 0; cursor:pointer; border-bottom:1px solid rgba(255,255,255,0.04);" data-topic-tag="${t.tag}">
        <div style="font-size:0.75rem; color:var(--emerald-neon); font-weight:600;">Trending in ${t.sport}</div>
        <div style="font-size:0.88rem; font-weight:700; color:white;">${t.tag}</div>
        <div style="font-size:0.72rem; color:var(--text-muted);">${t.posts}</div>
      </div>
    `).join('');
  }
};
